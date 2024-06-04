import React from "react";

function CardComponent({title, desc , image, onEdit}) {


  return (
    <div className="card lg:card-side bg-base-100 shadow-xl hover:shadow-xl hover:shadow-blue-700/20 cursor-pointer">
      <figure>
        <img
          src={image}
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <button onClick={onEdit} className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
