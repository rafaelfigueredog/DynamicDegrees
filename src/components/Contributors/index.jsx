import React from 'react';

import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

import contributors from './contributors.json';

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

        contributorContainer: {
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

        profile: {
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center'
        },
    };
});

export default function Contributors() {
    const classes = useStyles();

    const Icons = ({ github, linkedin }) => {
        return (
            <div className={classes.icons} >
                <Link 
                    alt='Github' 
                    target='_blank' 
                    href={github}
                > 
                    <FaGithub className={classes.icon} size={20} />
                </Link>
                <Link 
                    alt='Linkedin' 
                    target='_blank' 
                    href={linkedin}
                > 
                    <FaLinkedin className={classes.icon} size={20} />
                </Link>
            </div>
        );
    };

    const ContributorProfile = ({ contributor, github, linkedin, profile }) => {
        return (
            <div className={classes.contributorContainer}>
                <div className={classes.profile}>
                    <Avatar className={classes.avatar} alt={contributor} src={profile} />
                    <Icons github={github} linkedin={linkedin} />
                </div>
                <div>
                    <Typography className={classes.paragraph} variant="body2">
                        {contributor}
                    </Typography>
                </div>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            {contributors.contributors.map((contributorData, index) => (
                <ContributorProfile
                    key={index}
                    contributor={contributorData.contributor}
                    github={contributorData.github}
                    linkedin={contributorData.linkedin}
                    profile={contributorData.profile}
                />
            ))}
        </div>
    );
}