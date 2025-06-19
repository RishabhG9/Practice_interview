'use client'
import Link from "next/link";

export const MealLink = ({ id, name }: { id: string; name: string }) => {
  return <Link href={`/meals/${id}`}>{name}</Link>;
}
