import React from 'react';

import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

import authors from './authors.json';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },

        authorContainer: {
            display: 'flex',
            marginBottom: theme.spacing(4),
            alignItems: 'flex-start',
        },

        paragraph: {
            color: theme.palette.text.primary,
            marginLeft: theme.spacing(3),
        },

        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },

        icons: {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        icon: {
            margin: theme.spacing(0.5),
        },
    };
});

export default function Authors() {
    const classes = useStyles();

    const Icons = ({ github, linkedin }) => {
        return (
            <div className={classes.icons}>
                <Link alt="Github" target="_blank" href={github}>
                    <FaGithub className={classes.icon} size={20} />
                </Link>
                <Link alt="Linkedin" target="_blank" href={linkedin}>
                    <FaLinkedin className={classes.icon} size={20} />
                </Link>
            </div>
        );
    };

    const AuthorProfile = ({ author, github, linkedin, profile }) => {
        return (
            <div className={classes.authorContainer}>
                <Avatar className={classes.avatar} alt={author} src={profile} />
                <div>
                    <Typography className={classes.paragraph} variant="body2">
                        {author}
                    </Typography>
                    <Icons github={github} linkedin={linkedin} />
                </div>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            {authors.authors.map((authorData, index) => (
                <AuthorProfile
                    key={index}
                    author={authorData.author}
                    github={authorData.github}
                    linkedin={authorData.linkedin}
                    profile={authorData.profile}
                />
            ))}
        </div>
    );
}