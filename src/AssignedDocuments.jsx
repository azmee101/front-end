import React from "react";

const AssignedDocuments = () => {
  return (
    <div className="flex-1 p-4">
      <div className="text-3xl font-bold mb-4">Assigned Documents</div>
      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-wrap gap-4 mb-7">
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]"
            type="text"
            placeholder="Search by name or description"
          />
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]"
            type="text"
            placeholder="Search by meta tags"
          />
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
            onChange={(e) => {
              e.target.style.color = e.target.value ? '#000' : "text-black";
            }}
          >
            <option disabled value="">Select Category</option>
            <option>Admin</option>
            <option>ww</option>
            <option>jusqua 6</option>
            <option>Child Photos</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
            onChange={(e) => {
              e.target.style.color = e.target.value ? '#000' : "text-black";
            }}
          >
            <option disabled value="">Select</option>
            <option>Local Disk (Default)</option>
            <option>Amazon S3</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
            onChange={(e) => {
              e.target.style.color = e.target.value ? '#000' : "text-black";
            }}
          >
            <option disabled value="">Select Client</option>
            <option>abc</option>
            <option>rty</option>
            <option>ORSYS</option>
          </select>
        </div>

        <hr className="mb-4" />

        {/* Table Section */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto h-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-2 px- 4 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Category Name</th>
                  <th className="text-left py-2 px-4">Storage</th>
                  <th className="text-left py-2 px-4">Client</th>
                  <th className="text-left py-2 px-4">Created Date ↓</th>
                  <th className="text-left py-2 px-4">Expired Date</th>
                  <th className="text-left py-2 px-4">Created By</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {/* Row 1 */}
                <tr>

                  <td className="py-2 px-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                      </svg>
                    </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">Draft letter for Sender ID.doc</td>
                  <td className="truncate max-w-[200px]">ww</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client A</td>
                  <td className="truncate max-w-[200px]">5/3/2025</td>
                  <td className="truncate max-w-[200px]">5/3/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>

                </tr>

                {/* Row 2 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">out put pour ORSYS</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client B</td>
                  <td className="truncate max-w-[200px]">5/2/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>

                </tr>

                {/* Row 3 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">model G DE MOI 01</td>
                  <td className="truncate max-w-[200px]">jusqua 6</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client C</td>
                  <td className="truncate max-w-[200px]">5/2/2025</td>
                  <td className="truncate max-w-[200px] text-red-500">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>

                </tr>

                {/* Row 4 */}
                <tr>
                  
                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">WhatsApp image 2025-04-30 at 12.50.47 PM_ipeg</td>
                  <td className="truncate max-w-[200px]">Child Photos</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client D</td>
                  <td className="truncate max-w-[200px]">5/2/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>

                </tr>

                {/* Row 5 */}
                <tr>
                  
                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">J-LKL</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client E</td>
                  <td className="truncate max-w-[200px]">5/2/2025</td>
                  <td className="truncate max-w-[200px] text-red-500">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>

                </tr>

                {/* Row 6 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">signeddnew-wgZGmNyPB.pdf</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client F</td>
                  <td className="truncate max-w-[200px]">4/30/2025</td>
                  <td className="truncate max-w-[200px] text-red-500">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>
                </tr>

                {/* Row 7 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">Rajesh (1).docx</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client G</td>
                  <td className="truncate max-w-[200px]">4/29/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>
                </tr>

                {/* Row 8 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">PLP TALLY MANIFEST</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client H</td>
                  <td className="truncate max-w-[200px]">4/29/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>
                </tr>

                {/* Row 9 */}
                <tr>

                  <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">PLP KOJA SEGU2512900.pdf</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client I</td>
                  <td className="truncate max-w-[200px]">4/29/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>
                </tr>

                {/* Row 10 */}
                <tr>

                  <td className="py-2 px-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                      </svg>
                    </button>
                  </td>

                  <td className="truncate max-w-[200px] text-blue-500">Contrato Clean New.pdf</td>
                  <td className="truncate max-w-[200px]">Admin</td>
                  <td className="truncate max-w-[200px]">Local Disk (Default)</td>
                  <td className="truncate max-w-[200px]">Client J</td>
                  <td className="truncate max-w-[200px]">4/28/2025</td>
                  <td className="truncate max-w-[200px]">5/2/2026</td>
                  <td className="truncate max-w-[200px]">Ancells Elkins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4 text-sm bg-gray-200 p-3">
          <div>Items per page: 10</div>
          <div>1 - 10 of 233</div>
        </div>
      </div>
    </div>
  );
};

export default AssignedDocuments;