import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    navBar:{
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background,
        position: 'fixed',

    },
    link: {
        width: rem(50),
        height: rem(50),
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.85,

        '&:hover': {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        },
    },

    active: {
        opacity: 1,
        '&, &:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.15
            ),
        },
    },
}));