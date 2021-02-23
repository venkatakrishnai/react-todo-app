import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { getItem, updateItem, createItem } from "../services/item.js";
// import { getItem, updateItem, createItem } from "../services/itemWithFetch.js";

function Form({ props }) {
  const history = useHistory();

  let { item } = useParams();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  useEffect(() => {
    if (item !== "add") {
      getItem(item)
        .then(res => {
          if (res.data && res.data.item) {
            setName(res.data.item.name);
          }
          console.log("res", res);
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }, []);

  const handleSubmit = () => {
    let payload = {
      name
    };

    console.log("payload", payload, item);

    eval(item === "add" ? createItem(payload) : updateItem(item, payload))
      .then(res => {
        console.log("ressss");
        history.push("/");
      })
      .catch(error => {
        if (error.response.status === 422) {
          if (error.response.data && error.response.data.errors) {
            setNameError(
              error.response.data.errors.name
                ? error.response.data.errors.name[0]
                : null
            );
          }
        }
        console.log("error");
      });
  };

  return (
    <div className="container">
      <form>
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            Item Name
          </label>
          <input
            className="border py-2 px-3 text-grey-darkest"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={e => {
              if (name != e.target.value) {
                setName(e.target.value);
              }
            }}
          />
          {nameError && (
            <div className="text-sm leading-normal mt-1 text-red-600">
              {nameError}
            </div>
          )}
        </div>

        <div className="mb-10 ">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3"
          >
            {item === "add" ? "Add" : "Update"}
          </button>

          <button
            type="button"
            onClick={() => history.push("/")}
            className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
