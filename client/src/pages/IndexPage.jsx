/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  //! Fetch events from the server ---------------------------------------------------------------
  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
        console.log("done", response);
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };

  return (
    <>
      <div className="mt-1 flex flex-col">
        <div className="hidden sm:block">
          <div href="#" className="flex item-center inset-0">
          <img src="../src/assets/image.jpg" alt="" className="w-full h-65 object-cover rounded-lg" />
          </div>
        </div>
        <div className="flex justify-center my-6">
  <video
    autoPlay
    loop
    muted
    playsInline
    
    width="80%"
    className="rounded-lg shadow-lg h-64 object-cover"
  >
    <source src="/video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


        <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5 ">
          {events.length > 0 &&
            events.map((event) => {
              const eventDate = new Date(event.eventDate);
              const currentDate = new Date();

              if (
                eventDate > currentDate ||
                eventDate.toDateString() === currentDate.toDateString()
              ) {
                return (
                  <div className="bg-green-100 rounded-xl relative shadow-lg" key={event._id}>
                    <div className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] object-fill aspect-16:9">
                      {event.image && (
                        <img
                          src={`http://localhost:4000/api/${event.image}`}
                          alt={event.title}
                          width="300"
                          height="200"
                          className="w-full h-full rounded-t-lg"
                        />
                      )}
                      <div className="absolute flex gap-4 bottom-[20px] right-4">
                        <button onClick={() => handleLike(event._id)}>
                          <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-green-600" />
                        </button>
                      </div>
                    </div>
                    <div className="m-2 grid gap-2 text-green-900">
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg mt-2">
                          {event.title.toUpperCase()}
                        </h1>
                        <div className="flex gap-2 items-center mr-4 text-green-600">
                          <BiLike /> {event.likes}
                        </div>
                      </div>
                      <div className="flex text-sm flex-nowrap justify-between text-green-700 font-bold mr-4">
                        <div>
                          {event.eventDate.split("T")[0]}, {event.eventTime}
                        </div>
                        <div>
                          {event.ticketPrice === 0
                            ? "Free"
                            : "Rs. " + event.ticketPrice}
                        </div>
                      </div>
                      <div className="text-xs flex flex-col flex-wrap truncate-text">
                        {event.description}
                      </div>
                      <div className="flex justify-between items-center my-2 mr-4">
                        <div className="text-sm text-green-700">
                          Organized By: <br />
                          <span className="font-bold">{event.organizedBy}</span>
                        </div>
                        <div className="text-sm text-green-700">
                          Created By: <br />
                          <span className="font-semibold">
                            {event.owner.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <Link to={"/event/" + event._id} className="flex justify-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                          Book Ticket
                          <BsArrowRightShort className="w-6 h-6" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>

        {/* ABOUT US SECTION */}
        <div className="bg-green-50 py-10 px-6 mt-10 text-center">
          <h2 className="text-3xl font-bold text-green-700">
            ABOUT <span className="text-green-600">US</span>
          </h2>
          <p className="text-green-900 text-lg mt-4 max-w-4xl mx-auto">
            We are Corporate Event Planners and one of the Best Event Management
            Companies in Bangalore, offering services across India. Our forte
            lies in delivering cutting-edge, innovative, and professional event
            management services. We are a team of fun-loving, energetic, and
            passionate professionals working toward providing exceptional
            services.
          </p>
          <p className="text-green-900 text-lg mt-4 max-w-4xl mx-auto">
            Whether it’s a Virtual Conference, Award Ceremony, Product Launch,
            Family Event, or Sports Event, we’ve got you covered. We provide a
            one-stop solution for all corporate branding opportunities that
            exceed customer expectations.
          </p>
        </div>
      </div>
    </>
  );
}