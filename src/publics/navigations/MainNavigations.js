import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Drawer from '../../components/Drawer'
import Login from '../../screens/login/Login'
import LoginPin from '../../screens/login/LoginPin'
import Forget from '../../screens/login/forget'
import Register from '../../screens/register/Register'
import AuthLoading from '../../components/AuthLoading'
import AuthLoadingCustomer from '../../components/AuthLoadingCustomer'
import EditProfile from '../../screens/editprofile/EditProfile'
import ListScreen from '../../screens/screen/ListScreen'
import NewScreen from '../../screens/screen/NewScreen'
import ViewScreen from '../../screens/screen/ViewScreen'
import TransactionScreen from '../../screens/screen/TransactionScreen'
import TransactionListScreen from '../../screens/screen/TransactionListScreen'
import CardFormScreen from '../../screens/payment/CardFormScreen'
import QrScreen from '../../screens/screen/QRScreen'

import DrawerCustomer from '../../components/DrawerCustomer'
import RegisterCustomer from '../../screensCustomer/register/RegisterCustomer'
import UserListCustomer from '../../screensCustomer/userlist/UserList'
import EditProfileCustomer from '../../screensCustomer/editprofile/EditProfile'
import ListScreenCustomer from '../../screensCustomer/screen/ListScreen'
import ViewScreenCustomer from '../../screensCustomer/screen/ViewScreen'
import TransactionScreenCustomer from '../../screensCustomer/screen/TransactionScreen'
import TransactionListScreenCustomer from '../../screensCustomer/screen/TransactionListScreen'
import ScanScreenCustomer from '../../screensCustomer/screen/ScanScreen'
import CardFormScreenCustomer from '../../screensCustomer/payment/CardFormScreen'

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },

    LoginPin: {
        screen: LoginPin,
        navigationOptions: {
            header: null
        }
    },

    RegisterCustomer: {
        screen: RegisterCustomer,
        navigationOptions: {
            header: null
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Forget: {
        screen: Forget,
        navigationOptions: {
            header: null
        }
    },
})

const StackNavigator = createStackNavigator({
    TransactionListScreen: {
        screen: TransactionListScreen,
        navigationOptions: {
            header: null
        }
    },
    ListScreen: {
        screen: ListScreen,
        navigationOptions: {
            header: null
        }
    },
    NewScreen: {
        screen: NewScreen,
        navigationOptions: {
            header: null
        }
    },
    QrScreen: {
        screen: QrScreen,
        navigationOptions: {
            header: null
        }
    },
    ViewScreen: {
        screen: ViewScreen,
        navigationOptions: {
            header: null
        }
    },
    TransactionScreen: {
        screen: TransactionScreen,
        navigationOptions: {
            header: null
        }
    },
    CardFormScreen: {
        screen: CardFormScreen,
        navigationOptions: {
            header: null
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
})

const StackNavigator1 = createStackNavigator({
    TransactionListScreenCustomer: {
        screen: TransactionListScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
    TransactionScreenCustomer: {
        screen: TransactionScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
    ListScreenCustomer: {
        screen: ListScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
    ViewScreenCustomer: {
        screen: ViewScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
    CardFormScreenCustomer: {
        screen: CardFormScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
    UserListCustomer: {
        screen: UserListCustomer,
        navigationOptions: {
            header: null
        }
    },
    EditProfileCustomer: {
        screen: EditProfileCustomer,
        navigationOptions: {
            header: null
        }
    },
    ScanScreenCustomer: {
        screen: ScanScreenCustomer,
        navigationOptions: {
            header: null
        }
    },
})

const DrawerNavigator = createDrawerNavigator({
    StackNavigator,
}, {
        contentComponent: Drawer,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
        overlayColor: '#6b52ae',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#6b52ae',
        }
    })

    const DrawerNavigator1 = createDrawerNavigator({
        StackNavigator1,
    },
        {
            contentComponent: DrawerCustomer,
            drawerBackgroundColor: 'rgba(255,255,255,.9)',
            overlayColor: '#6b52ae',
            contentOptions: {
                activeTintColor: '#fff',
                activeBackgroundColor: '#6b52ae',
            }
        })

export default createAppContainer(createSwitchNavigator(
    {
        
        AuthLoading: AuthLoading,
        App: DrawerNavigator,
        Auth: AuthStack,

        AuthLoadingCustomer: AuthLoadingCustomer,
        App1: DrawerNavigator1,
        Auth1: AuthStack
        
    }
))