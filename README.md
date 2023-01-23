## API Reference

#### Register user

```http
  POST /register
```

| Parameter | Type     | Description                | Validations |
| :-------- | :------- | :------------------------- | :---------- |
| `name` | `string` | **Required** | **Min 1 Character**
| `email` | `string` | **Required** | **Valid Email**
| `password` | `string` | **Required** | **Min 6 Character**

#### Login user

```http
  POST /login
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `email`      | `string` | **Required** | **Min 1 Character**
| `password`      | `string` | **Required** | **Min 6 Character**
