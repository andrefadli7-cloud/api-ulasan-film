const express = require('express');
const app = express();
const port = 3300;
app.use(express.json());

const reviews = [
  {
    id: 1,
    film_id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    user: "Andi",
    rating: 5,
    comment: "Film animasi terbaik sepanjang masa!"
  },
  {
    id: 2,
    film_id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    user: "Budi",
    rating: 4,
    comment: "Sangat menyentuh!"
  },
  {
    id: 3,
    film_id: "eb87d96c-b72e-4125-99b3-6e3e53653198", 
    user: "Citra",
    rating: 5,
    comment: "Klasik Ghibli yang tak lekang oleh waktu."
  }
];

app.post('/reviews', (req, res) => {
  const { film_id, user, rating, comment } = req.body;

  
  if (!film_id || !user || !rating || !comment) {
    return res.status(400).json({ message: 'Semua field harus diisi!' });
  }

  const newReview = {
    id: reviews.length + 1,
    film_id,
    user,
    rating,
    comment,
  };

  reviews.push(newReview);

  res.status(201).json({
    message: 'Review berhasil ditambahkan!',
    data: newReview,
  });
});
  
 app.put('/reviews/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const { film_id, user, rating, comment } = req.body;

  
  const review = reviews.find(r => r.id === reviewId);

  if (!review) {
    return res.status(404).json({ message: 'Review tidak ditemukan!' });
  }

  
  if (film_id) review.film_id = film_id;
  if (user) review.user = user;
  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  res.json({
    message: 'Review berhasil diperbarui!',
    data: review,
  });
}); 

app.delete('/reviews/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const index = reviews.findIndex(r => r.id === reviewId);

  if (index === -1) {
    return res.status(404).json({ message: 'Review tidak ditemukan!' });
  }

  const deletedReview = reviews.splice(index, 1);

  res.json({
    message: 'Review berhasil dihapus!',
    data: deletedReview[0],
  });
});

app.get('/status', (req, res) => {
  res.send('Server is running!');
});


app.get('/reviews', (req, res) => {
  res.json(reviews);
});


app.get('/reviews/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);

  const review = reviews.find(r => r.id === reviewId);

  if (review) {
    res.json(review);
  } else {
    res.status(404).send('Ulasan tidak ditemukan.');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});