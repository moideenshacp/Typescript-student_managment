"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const nocache_1 = __importDefault(require("nocache"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Access the environment variables
const adminName = process.env.ADMIN_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminMobile = process.env.ADMIN_MOBILE;
const app = (0, express_1.default)();
// Connect to MongoDB
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
//express-session
app.use((0, express_session_1.default)({
    secret: 'mysitesessionsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(studentRoutes_1.default);
app.use((0, nocache_1.default)());
// Home route
app.get('/', (req, res) => {
    res.render('login');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("Listening to the server on http://localhost:3000"); });
