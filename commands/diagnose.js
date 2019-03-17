module.exports = {
    name = 'Self Diagnosis',
    alias =['diagnose', 'webmd'],
    helptext = 'What cancer do you have today?',
    helphide = false,
    permissions =['READ_MESSAGES'],
    category = 'general',
    command = (client, msg) => {
        switch (getRandomInt(0, 25)) {
            case 0:
                msg.reply("I'm sorry, It's Cancer.");
                break;
            case 1:
                msg.reply("I'm sorry, It's Lukemia.");
                break;
            case 2:
                msg.reply("I'm sorry, It's AIDS.");
                break;
            case 3:
                msg.reply("I'm sorry, It's Lesch-Nyhan.");
                break;
            case 4:
                msg.reply("I'm sorry, It's Heart Disease.");
                break;
            case 5:
                msg.reply("I'm sorry, It's Ebola.");
                break;
            case 6:
                msg.reply("I'm sorry, It's Addison’s disease.");
                break;
            case 7:
                msg.reply("I'm sorry, It's Asthma.");
                break;
            case 8:
                msg.reply("I'm sorry, It's Cardiac failure.");
                break;
            case 9:
                msg.reply("I'm sorry, It's Cardiomyopathy.");
                break;
            case 10:
                msg.reply("I'm sorry, It's Chronic obstructive pulmonary disorder.");
                break;
            case 11:
                msg.reply("I'm sorry, It's Chronic renal disease.");
                break;
            case 12:
                msg.reply("I'm sorry, It's Coronary artery disease.");
                break;
            case 13:
                msg.reply("I'm sorry, It's Crohn’s disease.");
                break;
            case 14:
                msg.reply("I'm sorry, It's Diabetes.");
                break;
            case 15:
                msg.reply("I'm sorry, It's Glaucoma.");
                break;
            case 16:
                msg.reply("I'm sorry, It's Haemophilia.");
                break;
            case 17:
                msg.reply("I'm sorry, It's Hypertension.");
                break;
            case 18:
                msg.reply("I'm sorry, It's Hypothyroidism.");
                break;
            case 19:
                msg.reply("I'm sorry, It's Multiple sclerosis.");
                break;
            case 20:
                msg.reply("I'm sorry, It's Parkinson’s disease.");
                break;
            case 21:
                msg.reply("I'm sorry, It's Rheumatoid arthritis.");
                break;
            case 22:
                msg.reply("I'm sorry, It's Schizophrenia.");
                break;
            case 23:
                msg.reply("I'm sorry, It's Systemic lupus erythematosus.");
                break;
            case 24:
                msg.reply("I'm sorry, It's Ulcerative colitis.");
                break;
            case 25:
                msg.reply("I'm sorry, It's Bipolar Mood Disorder.");
                break;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}