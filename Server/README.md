## API Reference

### Base Api URL

https://wood-fans-backend.vercel.app/

#### To Sign Up / Login / Login with google

```
  GET /user/signup
  GET /user/login
  GET /user/google
```

#### Get Products

```
  GET /products
  GET /products/:id

  //filter by type
  GET /products?type={type}

  //sort by
  GET /products?sort={price}&&order={asc}

  //Search by title
  GET /products?title={any letter or word}
```

#### Get Admin Access

```
  GET    /admin/user
  POST   /admin/user/create
  PATCH  /admin/user/update/:id
  DELETE /admin/user/delete/:id
```

#### Get Seller Access

```
  GET    /seller/products
  POST   /admin/products/add
  PATCH  /seller/products/update/:id
  DELETE /admin/products/delete:id
```
