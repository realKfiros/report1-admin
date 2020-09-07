import React from 'react';
import {
    ThemeProvider,
    createMuiTheme,
    StylesProvider,
    jssPreset
} from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL({ children }) {
    return (
        <StylesProvider jss={jss}>
            <div dir="rtl">
                {children}
            </div>
        </StylesProvider>
    )
}

export {
    RTL
};