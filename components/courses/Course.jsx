import React, { useState } from "react";
import toast from "react-hot-toast";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Enrolled from "./Enrolled";
import Stats from "./Stats";

export default function Course() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const deleteCourse = () => {
    toast("deleted");
  };
  return (
    <div className="p-4">
      <section className="flex flex-col gap-8 px-4 py-8 border-2 rounded-lg md:flex-row bg-primary bg-opacity-30 border-opacity-40 border-primary">
        <div id="cover" className="flex-1">
          <div className="w-full overflow-hidden bg-neutral h-80"></div>
        </div>
        <div id="content" className="flex flex-col flex-1">
          <h1 className="text-3xl font-extrabold">Course Title</h1>
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            quaerat, unde suscipit sit nostrum ullam possimus qui voluptates
            distinctio molestias ducimus assumenda molestiae tempore. Labore
            reprehenderit sed quo voluptates autem?
          </p>
          <div className="flex items-end justify-end flex-1 gap-4">
            <button className="btn btn-warning">edit</button>
            <button className="btn btn-primary">publish</button>
            <button onClick={handleDelete} className="btn btn-error">
              delete
            </button>
          </div>
        </div>
      </section>
      <section className="pt-10">
        <Stats />
      </section>
      <section className="pt-10">
        <Enrolled />
      </section>
      <ConfirmAction
        title="Confirm Deletion"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={deleteCourse}
      />
    </div>
  );
}
