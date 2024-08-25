const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lxSXJxUklFME0vT3pWaERmOHVhbFAxRlZOSnlBZDVRV0Z3Nm0zOThWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHFEYm1ZN2pvVnpRdDdmS2pYTUpsdHNTTGxJT2NldUtydnkrTjZjMEZBTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS3RnbGt0UmFkUmc2dlJ6RW01WmdMb0dKdlFjbmdSbElFc2IxUXJqMUhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4WUpPeDBUYTAvR1Q5TWlUYnZEM2RxaTBLTDRaYWxidllBOHUzWnp5OFNrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVIMGhPQithNC9lU3lwMTRYRkJSVktkUFhXd041K2lFdTBFQXA0UERUMTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZET2hrZkpZS3RiN0hpQUN5d1YxTUZPQjZ4SFUzZEZaUUxFL1hWTTAzRTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0NScXF2K0E5Sk93ZXp1YXpJZ0k5L2p1cDVBclJhVkh5Uk5LUitYam4wbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXc4bURqMitLalJhODZQb2dXemlwNVpGSDlWcDUrNDJLV1NUTVl3RFFRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img0dFNNT2c0NjRFd2VVeDNiV0dNc0ZMMmhJeGJWSWhuSUZ0V2pqZXJyOFYxazdKM29zMitqdzU2d1BYcXFBU1FvNVZZSXFvUUZhTEYzdElDdkF4eGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk1LCJhZHZTZWNyZXRLZXkiOiIvOXJkVmpwbnpqSlAzZU9EMkFhd3VmZmZIeTkvU0h0RlFnTUNDSDB1amxFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5R0VVUk9wM1JKbWlrZUtlY0dBZFVRIiwicGhvbmVJZCI6IjVhYzg0NTc0LTQzYzYtNGJkMS1hMmNiLTA0Njg1OWQxYWJmMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiRUJxOERYRWo2VEpEbGFlM0kxM3R4NkUwSW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEsySlEwbWNpZEFRNjBtcjBlRlgzYUFPN0dJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdXUkU2TUpGIiwibWUiOnsiaWQiOiIyNTQ3ODgyODEwNDI6MTVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BuTmpNOEVFTGVJckxZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii9MVUR0T0MwTy80UkZWeVdJL2g1R2Fab3JoR3R5WlJGck9FbmQrUUlCUlk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJsM3plVW5FUGUwdEl2M2pUWDBxRjN1Slo3b1FPSFFaSTFFdUpLcndEV21aeityeDRRcG12dzFjanVmUmVkUmRZeERKOTVNMzdRQ2Z5Q2ZlQllHTUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrZGpCaUJXQjAzRWx1aDNXaS83cU1KTlFmV1VCOFpMcGRjejlEYkdVRHdQd01UcWM0dEhwSDg2MWp1NVh2dmsrLzNpci93ZUNCZDdTZ3RUNXF4SU9nUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc4ODI4MTA0MjoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmeTFBN1RndER2K0VSVmNsaVA0ZVJtbWFLNFJyY21VUmF6aEozZmtDQVVXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NTgwOTMzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlnQSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KHERMSOR",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254788281042", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'KHAMNAJ.A.B,
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

