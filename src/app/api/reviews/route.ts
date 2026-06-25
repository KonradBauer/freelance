export const revalidate = 3600;

type Review = {
  author: string;
  photoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

type ReviewsResponse = {
  reviews: Review[];
  placeRating?: number;
};

export async function GET(): Promise<Response> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return Response.json({ reviews: [] } satisfies ReviewsResponse);
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,displayName",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`[reviews] Places API error: ${res.status}`);
      return Response.json({ reviews: [] } satisfies ReviewsResponse);
    }

    const data = await res.json();

    const reviews: Review[] = (data.reviews ?? [])
      .slice(0, 5)
      .filter((r: Record<string, unknown>) => r.text && r.rating)
      .map((r: Record<string, unknown>) => ({
        author: (r.authorAttribution as Record<string, unknown>)?.displayName as string ?? "Anonimowy",
        photoUri: ((r.authorAttribution as Record<string, unknown>)?.photoUri as string) ?? null,
        rating: r.rating as number,
        text: (r.text as Record<string, unknown>)?.text as string ?? "",
        relativeTime: (r.relativePublishTimeDescription as string) ?? "",
      }));

    return Response.json({
      reviews,
      placeRating: data.rating,
    } satisfies ReviewsResponse);
  } catch (err) {
    console.error("[reviews] Fetch failed:", err);
    return Response.json({ reviews: [] } satisfies ReviewsResponse);
  }
}
