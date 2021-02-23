import React, { useEffect, useState } from "react";

// import { getItems, deleteItem, updateItemStatus } from "../services/item.js";

import {
  getItems,
  deleteItem,
  updateItemStatus
} from "../services/itemWithFetch.js";

import moment from "moment";
import { Link } from "react-router-dom";

function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsList();
  }, []);

  const getItemsList = () => {
    getItems()
      .then(res => {
        if (res.data && res.data.items) {
          const items = res.data.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              status: item.status ? "Active" : "In-active",
              created_at: moment(item.created_at).format("YYYY-MM-DD HH:mm:ss"),
              updated_at: moment(item.updated_at).format("YYYY-MM-DD HH:mm:ss")
            };
          });
          console.log("items", items);
          setItems(items);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const deleteTheItem = id => {
    deleteItem(id)
      .then(res => {
        getItemsList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Link
        to={`/item/add`}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3"
      >
        Add
      </Link>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created on
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Updated on
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, key) => {
                    return (
                      <tr className="bg-white" key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm
                              ${
                                item.status == "Active"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                        >
                          {item.status}
                          <label className="flex items-center cursor-pointer">
                            <div className="relative">
                              <input
                                id="toogleA"
                                type="checkbox"
                                className="hidden"
                                checked={item.status == "Active" ? true : false}
                                onChange={e => {
                                  updateItemStatus(item.id, {
                                    status: e.target.checked
                                  })
                                    .then(res => {
                                      getItemsList();
                                    })
                                    .catch(error => {
                                      console.log("error", error);
                                    });
                                }}
                              />
                              <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                              <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                            </div>
                          </label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.updated_at}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/item/${item.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>

                          <button
                            className="text-red-600 hover:text-red-900 ml-3"
                            onClick={() => deleteTheItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
