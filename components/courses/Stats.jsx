import React from "react";

export default function Stats({ course }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="shadow stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Respect</div>
          <div className="stat-value text-primary">{course?.respect}</div>
          <div className="stat-desc">Top 0% this month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Level</div>
          <div className="stat-value text-secondary">{course?.level === "0" ? "Beginner" : course?.level === "1" ? "Intermediate" : "Advanced"}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={course?.channelImage} />
              </div>
            </div>
          </div>
          <div className="stat-value">{course?.respect}</div>
          <div className="stat-title">{course?.channel}</div>
          <div className="stat-desc text-secondary">this month</div>
        </div>
      </div>
    </div>
  );
}
