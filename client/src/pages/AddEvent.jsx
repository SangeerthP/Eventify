import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/createEvent", formData)
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        alert("Event posted successfully!");
      })
      .catch((error) => {
        console.error("Error posting event:", error);
        alert("Error posting event. Please try again.");
      });
  };
  
 

  return (
    <div className="flex ml-20 mt-10 p-8">
      <div className="w-1/2">
    <video
      className="w-full h-[500px] rounded-lg shadow-lg"
      src="/video-2.mp4"
      autoPlay
      loop
      muted
    >
      Your browser does not support the video tag.
    </video>
  </div>

      {/* Form Section */}
      <div className="w-1/2 ml-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className='font-bold text-[36px] mb-5'>Post an Event</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='flex flex-col gap-5'>
            <label className='flex flex-col'>
              Title:
              <input
                type="text"
                name="title"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Optional:
              <input
                type="text"
                name="optional"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.optional}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Description:
              <textarea
                name="description"
                className='rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 border-none'
                value={formData.description}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Organized By:
              <input
                type="text"
                name="organizedBy"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.organizedBy}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Event Date:
              <input
                type="date"
                name="eventDate"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.eventDate}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Event Time:
              <input
                type="time"
                name="eventTime"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.eventTime}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Location:
              <input
                type="text"
                name="location"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.location}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Ticket Price:
              <input
                type="number"
                name="ticketPrice"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </label>

            <label className='flex flex-col'>
              Image:
              <input
                type="file"
                name="image"
                className='rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none'
                onChange={handleImageUpload}
              />
            </label>

            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">
  Submit
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
