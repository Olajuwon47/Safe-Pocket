import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const KYCProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [idType, setIdType] = useState(""); // BVN, National ID, Driver’s License
  const [idValue, setIdValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data = {
      name,
      username,
      date,
      gender,
      idType,
      idValue,
      faceVerification: image,
    };
    console.log("KYC Data:", Data);
    navigate("/CustomButton");
  };

  return (
    <div className="min-h-screen max-sm:px-2 max-md:px-3 bg-gray-100 flex items-center justify-center p-4">
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left side image */}
        <div className="bg-gray-200 max-sm:p-4 max-md:p-6 flex items-center justify-center p-8">
          <img alt="KYC" src="" className="h-full w-full object-cover" />
        </div>

        {/* Right side form */}
        <div className="p-8 max-sm:p-4 max-md:p-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl max-sm:text-3xl max-md:text-4xl">
              Setup Your KYC Profile
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              
              {/* Face Verification */}
              <div className="text-center mt-2 flex justify-center sm:col-span-2">
                <div className="relative w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    <PhotoIcon className="mx-auto size-12 text-gray-300" />
                    <span className="text-sm text-gray-500">Upload Face ID</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              {/* Username */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              {/* Date of Birth */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              {/* Gender */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 text-gray-500 focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Means of Identification */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Means of Identification
                </label>
                <select
                  value={idType}
                  onChange={(e) => {
                    setIdType(e.target.value);
                    setIdValue("");
                  }}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 text-gray-500 focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">Choose one</option>
                  <option value="BVN">BVN</option>
                  <option value="National ID">National ID</option>
                  <option value="Driver’s License">Driver’s License</option>
                </select>
              </div>

              {/* Show input only when an ID type is selected */}
              {idType && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {idType} Number
                  </label>
                  <input
                    type="text"
                    value={idValue}
                    onChange={(e) => setIdValue(e.target.value)}
                    required
                    className="mt-2.5 block w-full rounded-md border px-3.5 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="mt-5">
              <button
                type="submit"
                className="
                w-full min-w-[130px] h-10 
                    text-white font-bold 
                    px-2.5 py-1.5 
                    relative inline-block 
                    rounded-md border-none outline-none 
                    cursor-pointer transition-all duration-300 ease-in-out 
                    bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                    hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                    active:shadow-[0_0px_0_#57cc99] active:top-[5px]"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KYCProfile;
