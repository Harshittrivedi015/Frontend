function CustomerReviews() {
  const reviews = [
    {
      name: "Emily R.",
      rating: 5,
      comment: "Absolutely loved the experience! The booking process was seamless.",
    },
    {
      name: "John D.",
      rating: 4,
      comment: "Great service, but I'd love more destination options.",
    },
    {
      name: "Sofia M.",
      rating: 5,
      comment: "The trip was magical. I’ll definitely book again!",
    },
  ];

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="relative bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://inmoment.com/wp-content/uploads/2023/11/blog-hero-Review-Management-An-Essential-Component-of-Modern-Marketing-1.jpg')]">
      
      <div className="absolute inset-0 bg-opacity-50"></div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 text-white">
          <h3 className="text-3xl font-semibold">What Our Customers Say</h3>
          <p className="mt-2">
            ⭐ {averageRating} / 5.0 – Based on {reviews.length} reviews
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white bg-opacity-90 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
              <div className="flex justify-center items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
              </div>
              <span className="font-medium text-blue-700">{review.name}</span>
            </div>
          ))}
        </div>

       
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow">
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviews;
