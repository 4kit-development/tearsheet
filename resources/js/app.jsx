/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Settings from './components/settings';

const settings = document.getElementById('settings');
ReactDOM.render(<Settings {...{'enabled': settings.dataset.enabled, 'logo': settings.dataset.logo, 'contact': settings.dataset.contact, 'layout': settings.dataset.layout}}/>, settings);
