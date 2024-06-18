import React, {useState, useEffect} from "react";
export default function CardDetail() {
  // const [room, setRoom] = useState({ image: '', price: 0 });
  // useEffect(() => {
  //   // Replace API endpoint
  //   fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setRoom({ image: data.image, price: data.price });
  //     });
  // }, []);
  return (
    <article className="overflow-hidden rounded-lg shadow-lg transition hover:shadow-lg">
      <img
        alt="" src="https://images.unsplash.com/photo-1561501878-aabd62634533?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D"
        // src={room.image}
        className="h-56 w-full object-cover"
      />

      <div className="bg-white p-4 sm:p-6">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">
            How to position your furniture for positivity
          </h3>
          <h3 className="mt-0.5 text-lg text-gray-900">
            {/* Room Price: {room.price} */}
          </h3>
        </a>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>
      </div>
    </article>
  );
}
