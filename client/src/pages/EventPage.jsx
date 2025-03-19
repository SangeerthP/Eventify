import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  //! Fetching the event data from the server by ID ------------------------------------------
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/event/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [id]);

  //! Copy & Share Functionalities ----------------------------------------------------------
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const whatsappMessage = encodeURIComponent(window.location.href);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookShareUrl);
  };

  if (!event) return "";

  return (
    <div className="flex flex-col mx-5 xl:mx-32 md:mx-10 mt-5 flex-grow">
      {/* Event Image */}
      <div className="relative">
        {event.image && (
          <img src={event.image} alt="" className="rounded-lg object-cover w-full h-96 shadow-lg" />
        )}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-green-500">{event.title}</h1>
        </div>
      </div>

      {/* Event Overview Section */}
      <div className="bg-green-100 text-center py-6 px-4 mt-6 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">Experience the Best of {event.title}</h2>
        <p className="text-lg text-gray-700 mt-3 max-w-3xl mx-auto">
          Join us for an unforgettable event filled with excitement, networking, and unique experiences. 
          Don't miss out on the chance to be part of something extraordinary!
        </p>
      </div>

      {/* Event Header Section */}
      <div className="flex justify-between items-center mt-8 mx-2">
        <h1 className="text-3xl md:text-5xl font-extrabold">{event.title.toUpperCase()}</h1>
        <Link to={`/event/${event._id}/ordersummary`}>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition">
            Book Ticket
          </button>
        </Link>
      </div>

      {/* Event Pricing */}
      <div className="mx-2">
        <h2 className="text-xl md:text-2xl font-bold mt-3 text-green-700">
          {event.ticketPrice === 0 ? "Free Event - Join Us!" : "Price: Rs. " + event.ticketPrice}
        </h2>
      </div>

      {/* Event Description */}
      <div className="mx-2 mt-5 text-lg md:text-xl text-gray-800 leading-relaxed">
        {event.description}
      </div>

      {/* Event Organizer */}
      <div className="mx-2 mt-5 text-lg md:text-xl font-bold text-green-800">
        Organized By: {event.organizedBy}
      </div>

      {/* Event Details Section */}
      <div className="bg-gray-100 py-8 px-6 mt-8 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">Event Details</h1>
        <div className="sm:mx-5 lg:mx-32 mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Date & Time */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <AiFillCalendar className="text-green-700 text-4xl" />
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-extrabold text-gray-900">Date & Time</h1>
              <p className="text-md text-gray-700">
                Date: {event.eventDate.split("T")[0]} <br />
                Time: {event.eventTime}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <MdLocationPin className="text-green-700 text-4xl" />
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-extrabold text-gray-900">Location</h1>
              <p className="text-md text-gray-700">{event.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mx-2 mt-10 text-lg md:text-xl font-extrabold text-gray-900 text-center">
        Share This Event
        <div className="mt-6 flex justify-center gap-6">
          <button onClick={handleCopyLink} className="text-gray-700 hover:text-green-600 transition">
            <FaCopy className="text-3xl" />
          </button>
          <button onClick={handleWhatsAppShare} className="text-green-500 hover:text-green-700 transition">
            <FaWhatsappSquare className="text-3xl" />
          </button>
          <button onClick={handleFacebookShare} className="text-blue-600 hover:text-blue-800 transition">
            <FaFacebook className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
