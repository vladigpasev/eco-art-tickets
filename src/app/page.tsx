'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
{/* @ts-ignore */}
export default function Validate({ params, searchParams }) {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function fetchData() {
            // Зареждане на данни за евента
            const eventId = searchParams.event_id;  // Replace with actual event_id
            const eventResponse = await axios.get(`/api/events/get?event_id=${eventId}`);
            console.log(JSON.stringify(eventResponse));
            setEvent(eventResponse.data.events);


        }

        fetchData();
    }, []);


    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 md:w-3/5">
        <div className="border rounded-xl p-6 bg-[#f7f9fc] shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-center border-b pb-2">Your Ticket</h2>
          {event ? (
            <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center mt-4">
              <div className="flex flex-col space-y-2 text-lg">
                {/* @ts-ignore */}
                <p><span className="font-semibold">Event:</span> {event.title}</p>
                {/* @ts-ignore */}
                <p><span className="font-semibold">Date:</span> {event.date}</p>
                {/* @ts-ignore */}
                <p><span className="font-semibold">Mentor:</span> {event.mentor}</p>
                
              </div>
              <div className="md:w-1/3">
                {/* @ts-ignore */}
              <QRCode  value={`https://admin.eco-art.xyz/validate?event_id=${event._id}&user_id=${searchParams.user_id}`} 
          size={128} 
        />
        
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
    );
    

}

