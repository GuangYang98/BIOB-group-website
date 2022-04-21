import Research from "./components/Research";
import home from '@/components/home'
import News from '@/components/News'
import People from '@/components/People'
import Publication from './components/Publication'
import Contact from './components/Contact'
import NotFound from './views/404.vue'
import Login from "./components/Login"


let routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/Home',
        name: 'home',
        component: home
    },
        {
            path:'/News',
            name: 'News',
            component: News
        },
    {
        path:'/Login',
        name: 'Login',
        component: Login
    },
    {
        path:'/Research',
        name: 'Research',
        component: Research,
    },
        {
            path:'/Publication',
            name: Publication,
            component: Publication
        },
        {
            path:'/Contact',
            name: 'Contact',
            component: Contact
        },

        {
            path:'/People',
            name: 'People',
            component: People
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        }
    ]

export default routes;
