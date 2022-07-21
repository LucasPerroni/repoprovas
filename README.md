<p align="center">
  <h1 align="center">
    RepoProvas
  </h1>
</p>

## 💻 Technologies and Tools

- REST APIs
- Node.js
- TypeScript
- PostgreSQL
- Prisma

---

## 🏁 Usage

```bash
$ git clone https://github.com/LucasPerroni/repoprovas.git

$ cd repoprovas

$ npm install

$ npm run dev
```

---

## 🚀 API:

```yml
POST /signup
    - Route to sign up
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum" (min 6),
        "confirmPassword": "loremipsum" (equal password)
    }
```

```yml
POST /signin
    - Route to sign in
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum" (min 6)
    }
```

```yml
POST /tests (authenticated)
    - Route to create tests
    - headers: { "Authorization": "Bearer $token"}
    - body: {
        "name": "loremipsum",
        "pdfUrl": "http://uri",
        "category": "loremipsum",
        "discipline": "loremipsum",
        "teacher": "loremipsum"
    }
```
