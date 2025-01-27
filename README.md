# Project Store

_**Autorzy**: Jakub Zając, Mateusz Ryś, Szymon Borusiewicz, Szymon Semeńczuk_

---

## Setup projektu

Aby uruchomić projekt lokalnie, postępuj zgodnie z poniższymi krokami:

1. Uruchom główny katalog projektu `/project-store` w terminalu.
2. Upewnij się, że masz zainstalowane wszystkie zależności, niezbędne do uruchomienia projektu 
```bash 
npm install
```
3. Uruchom serwer za pomocą komendy:
```bash
npm start
```

4. Uruchom katalog z backendem `/project-store/backend` w terminalu.

5. Uruchom serwer z backendem za pomocą komendy:
```bash
node server.js
```

6. Po uruchomieniu serwera, API będzie dostępne pod adresem `http://localhost:5001`

---

## Użyta technologia i biblioteki

### Backend

- **Node.js** - platforma JavaScript do tworzenia aplikacji backendowych
- **Express.js** - minimalistyczny framework do budowy REST API
- **JWT (JSON Web Token)** - do zarządzania autoryzacją
- **bcrypt.js** - do hashowania haseł użytkowników
- **Pliki JSON** - używane jako proste lokalne rozwiązanie do przechowywania danych

### Frontend

- **React.js** - biblioteka do budowy interfejsów użytkownika
- **React Router** - służy do zarządzania trasami i nawigacją w aplikacji SPA
- **JWT-decode** - do odczytu i weryfikacji tokenów JWT na frontendzie

---

## Endpointy

### Moduł użytkowników (Users)

- `GET /api/users` - zwraca listę wszystkich użytkowników
- `GET /api/users/user/:id` - zwraca szczegóły użytkownika o danym ID
- `POST /api/users/register` - pozwala zarejestrować nowego użytkownika
- `POST /api/users/login` - loguje użytkownika i zwraca token JWT po udanym logowaniu
- `GET /api/users/session` - zwraca szczegóły aktualnej sesji zalogowanego użytkownika na podstawie tokenu JWT
- `GET /api/users/profile` - wyświetla szczegóły profilu aktualnie zalogowanego użytkownika na podstawie tokenu JWT
- `GET /api/users/orders` - zwraca listę zamówień aktualnie zalogowanego użytkownika na podstawie tokenu JWT

### Moduł produktów (Products)

- `GET /api/products` - zwraca listę wszystkich produktów
- `GET /api/products/:id` - zwraca szczegóły produktu o danym ID

### Moduł zamówień (Orders)

- `GET /api/orders` - zwraca listę wszystkich zamówień
- `GET /api/orders/:id` - zwraca szczegóły zamówienia o danym ID
- `POST /api/orders` - dodaje nowe zamówienie

### Moduł recenzji (Reviews)

- `GET /api/reviews/:productId` - zwraca listę wszystkich recenzji produktu o danym ID
- `POST /api/reviews/:productId` - dodaje nową recenzję produktu o danym ID
- `DELETE /api/reviews/:id` - usuwa recenzję o danym ID
- `PUT /api/review/:id` - edytuje recenzję o danym ID

---

## Komponenty frontendowe

- **AddReview** - formularz do dodania nowej recenzji
- **Login** - formularz do logowania
- **Register** - formularz do rejestracji
- **Cart** - widok koszyka
- **EditReview** - formularz do edytowania istniejącej recenzji
- **Header** - Navbar do nawigacji między poszczególnymi komponentami
- **OrderPage** - formularz do wpisywania danych zamówienia
- **OrderConfirmation** - strona potwierdzająca złożenie zamówienia
- **OrderDetails** - strona z szczegółami danego zamówienia
- **OrdersList** - widok historii wszystkich zamówień (dostępny dla admina)
- **ProductList** - lista wszystkich dostępnych produktów w sklepie, wyświetlająca się na głównej stronie sklepu
- **ProductDetails** - strona ze szczegółami danego produktu
- **Profile** - strona profilu użytkownika wraz z jego danymi i historią zamówień
- **RegistrationConfirmation** - strona potwierdzająca zarejestrowanie użytkownika
- **ReviewsList** - lista wszystkich recenzji danego produktu
- **Searcher** - wyszukiwarka pozwalająca wyszukiwać produkty w sklepie po nazwie oraz sortować je według nazwy i ceny

