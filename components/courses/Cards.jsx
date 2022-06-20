import Link from "next/link";
import React from "react";

export default function Cards() {
  const data = [
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
    {
      title: "frontend course",
      desc: "If a dog chews shoes whose shoes does he choose?",
      slug: "frontend-course",
    },
  ];
  const elements = data.map((i, j) => {
    return (
      <div class="card card-compact w-full bg-base-100 shadow-xl" key={j}>
        <figure>
          <img
            src="https://api.lorem.space/image/shoes?w=400&h=225"
            alt="Shoes"
          />
        </figure>
        <div class="card-body bg-base-300">
          <h2 class="card-title text-sm">{i?.title}</h2>
          <p class="text-xs">{i?.desc}</p>
          <div class="card-actions justify-end">
            <Link href="/courses/frontend">
              <a class="btn btn-accent btn-sm">VIEW</a>
            </Link>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {elements}
      </div>
    </>
  );
}