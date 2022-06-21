import Link from "next/link";
import React from "react";

export default function Cards({ courses }) {

  const elements = courses.map((i, j) => {
    return (
      <div className="card card-compact w-full bg-base-100 shadow-xl" key={j}>
        <figure>
          <img
            src={i.thumbnail}
            alt={i.name}
          />
        </figure>
        <div className="card-body bg-base-300">
          <h2 className="card-title text-sm">{i?.name}</h2>
          <p className="text-xs">{i?.desc}</p>
          <div className="card-actions justify-between items-center">
            <img
              src={i.channelImage}
              alt={i.channel}
              className="rounded-full h-8"
            />
            <Link href={`/courses/${i._id}`}>
              <a className="btn btn-accent btn-sm">VIEW</a>
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
