'use client'
import React, { useState } from "react";

interface Review {
  name: string;
  desc: string;
  review: number;
  image: string | null;
}

interface GameReviewProps {
  name: string;
  desc: string;
  review: number;
  image: string | null;
}

const GameReview: React.FC<GameReviewProps> = ({ name, desc, review }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Description: {desc}</p>
      <p>Review: {review}</p>
    </div>
  );
};

interface GameReviewFormProps {
  onSubmit: (review: Review) => void;
}

const GameReviewForm: React.FC<GameReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, desc, review: parseInt(score), image: null });
    setName("");
    setDesc("");
    setScore("");
  };

  return (
    <div style={{border: "2px solid #7FFF00", padding: "2rem"}}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            style={{ border: "1px solid #eee text-black" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            style={{ border: "1px solid #eee text-black" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label>Score:</label>
          <input
            style={{ border: "1px solid #eee text-black" }}
            type="number"
            min="1"
            max="10"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <button style={{ border: "1px solid #eee" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const GameReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    { name: "FIFA", desc: "Football game", review: 10, image: null },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const addReview = (newReview: Review) => {
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  };

  return (
    <>
      {reviews.map((review, index) => (
        <GameReview key={index} {...review} />
      ))}
      <div>
        <button
          style={{ border: "1px solid #eee" }}
          onClick={() => setShowReviewForm(true)}
        >
          New review
        </button>
      </div>
      {showReviewForm && <GameReviewForm onSubmit={addReview} />}
    </>
  );
};

export default GameReviews;
