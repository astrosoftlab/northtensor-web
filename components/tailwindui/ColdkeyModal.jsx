import { Fragment, useState  } from 'react';

export default function ColdkeyModal({ name, coldkey, onSave, onClose }) {

  const [newName, setNewName] = useState(name);
  const [newColdkey, setNewColdkey] = useState(coldkey);

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleColdkeyChange(event) {
    setNewColdkey(event.target.value);
  }

  function handleSave() {
    onSave(newName, newColdkey);
    onClose();
  }

  function handleClose() {
    onClose();
  }

  return (
    <Fragment style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-20"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Edit the name and coldkey below:
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={newName}
                    onChange={handleNameChange}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="coldkey" className="block text-sm font-medium text-gray-700">
                  Coldkey
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="coldkey"
                    id="coldkey"
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={newColdkey}
                    onChange={handleColdkeyChange}
                  />
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center mt-4 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
