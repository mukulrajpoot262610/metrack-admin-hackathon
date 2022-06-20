import React from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../services/api";

export default function Table({ data, handleDelete, loading }) {
  const rows = data.map((i, j) => {
    return (
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src="avatar.svg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{i?.name}</div>
              <div className="text-sm opacity-50">{i?.email}</div>
            </div>
          </div>
        </td>
        <td>
          User since 1949
          <br />
          <span
            className={`badge badge-sm ${
              i?.role > 1 ? "badge-success" : "badge-ghost"
            }`}
          >
            {i?.role > 1 ? "admin" : "user"}
          </span>
        </td>
        <td>
          {i?.verified ? (
            <p className="font-bold text-green-500">verified</p>
          ) : (
            <p>unverified</p>
          )}
        </td>
        <th>
          <button
            onClick={() => handleDelete(i._id)}
            className="btn btn-error btn-xs"
          >
            delete
          </button>
        </th>
      </tr>
    );
  });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Verification</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}
