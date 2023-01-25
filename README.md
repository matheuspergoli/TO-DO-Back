
## API Reference

#### Register user

```
POST /register
```

| Parameter | Type     | Description                | Validations |
| :-------- | :------- | :------------------------- | :---------- |
| `name` | `string` | **Required** | **Min 1 Character**
| `email` | `string` | **Required** | **Valid Email**
| `password` | `string` | **Required** | **Min 6 Character**

#### Login user

```
POST /login
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `email`      | `string` | **Required** | **Min 1 Character**
| `password`      | `string` | **Required** | **Min 6 Character**

```
GET /tasks
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `User ID`      | `string` | **Required** | **Valid JWT Token**

```
DELETE /tasks/:id
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `Task ID`      | `number` | **Required** | **Valid Task ID**
| `User ID`      | `string` | **Required** | **Valid JWT Token**

```
POST /tasks
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `Title`      | `string` | **Required** | **Min 1 Character**
| `Priority`      | `number` | **Required** | **Min 1 and Max 3**
| `User ID`      | `string` | **Required** | **Valid JWT Token**

```
PUT /tasks/:id
```

| Parameter | Type     | Description                       | Validations |
| :-------- | :------- | :-------------------------------- | :---------- |
| `Task ID`      | `number` | **Required** | **Valid Task ID**
| `User ID`      | `string` | **Required** | **Valid JWT Token**
