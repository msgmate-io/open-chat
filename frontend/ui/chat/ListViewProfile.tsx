export default ListViewProfile;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

function ListViewProfile() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <form
      id="listViewProfile"
      className="flex bg-base-300 flex-col w-full gap-2 p-2 mt-4 shadow rounded-xl"
    >
      <div className="flex flex-row w-full">
        <h1 className="text-2xl">Profile</h1>
        <div className="w-full flex flex-row justify-end content-center items-center gap-2 px-2">
          <div className="badge badge-lg">987,654</div>
          <button className="btn btn-xs btn-success">save</button>
        </div>
      </div>
      <div className="w-full bg-error">error display placeholder</div>
      <span>First name</span>
      <input
        type="text"
        placeholder="John"
        className="input input-bordered input-accent w-full"
      />
      <span>Second Name</span>
      <input
        type="text"
        placeholder="Doe"
        className="input input-bordered input-accent w-full"
      />
      <span>Email</span>
      <input
        type="text"
        placeholder="example@gmail.com"
        className="input input-bordered input-accent w-full"
      />
    </form>
  );
}
