import React from "react";

export default function EditCourse() {
  return (
    <div className="p-4">
      <form className="max-w-5xl mx-auto space-y-4">
        <div>
          <label htmlFor="title" className="custom-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="title"
            className="custom-input"
          />
        </div>
        <div>
          <label htmlFor="title" className="custom-label">
            Description
          </label>
          <textarea
            id="title"
            type="text"
            placeholder="title"
            className="custom-textarea"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative flex items-center justify-center w-full h-40 bg-base-300">
            Upload Thumbnail
            <input type="file" className="absolute inset-0 opacity-0" />
          </div>
          <div className="relative flex items-center justify-center w-full h-40 bg-base-300">
            Upload Channel Image
            <input type="file" className="absolute inset-0 opacity-0" />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="custom-label">
            Video
          </label>
          <input
            id="title"
            type="number"
            placeholder="title"
            className="custom-input"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="custom-label">
              Channel
            </label>
            <input
              id="title"
              type="text"
              placeholder="title"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="title" className="custom-label">
              Respect
            </label>
            <input
              id="title"
              type="number"
              placeholder="title"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="title" className="custom-label">
              Tags (comma separated)
            </label>
            <input
              id="title"
              type="text"
              placeholder="title"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="title" className="custom-label">
              Level
            </label>
            <input
              id="title"
              type="text"
              placeholder="title"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="title" className="custom-label">
              Published
            </label>
            <input
              id="title"
              type="select"
              placeholder="title"
              className="custom-input"
            />
          </div>
        </div>
        <div className="flex items-end justify-end gap-4 py-8">
          <button className="btn btn-primary">Publish</button>
          <button className="btn btn-warning">Cancel</button>
        </div>
      </form>
    </div>
  );
}
