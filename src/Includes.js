import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { doc,collection,deleteDoc , addDoc, getDocs, updateDoc } from "firebase/firestore"; 
import  db from "./firebase";
import Tasks from './components/Tasks.js';
import { Link } from 'react-router-dom';
import Header from './components/Header.js'; 
import Footer from './components/Footer.js';
 