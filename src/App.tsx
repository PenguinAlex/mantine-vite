import {Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contacts from "./pages/Contacts.tsx";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {useState} from "react";
import NavMenuComponent from "./components/NavMenuComponent/NavMenuComponent.tsx";
import Events from "./pages/Events.tsx";
import Projects from "./pages/Projects.tsx";


function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

 const links = [
     {link: '/', label: 'Главная'},
     {link: '/about', label: 'О нас'},
     {link: '/contacts', label: 'Контакты'},
     {link: '', label: 'Контакты', links:[
             {link: '/rent', label: 'Аренда'},
             {link: '/photos', label: 'Съёмка 360'},
             {link: '/shop', label: 'Магазин'},
             {link: '/dev', label: 'Разработка'},
         ]},
 ]

  return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{
              white:'#FFF',
              black:'#000',
              colorScheme: colorScheme,
              primaryColor: colorScheme === 'dark'? 'dark': 'gray',
          }}>
              <HeaderComponent links={links} />
              <NavMenuComponent/>
              <main style={{backgroundColor: colorScheme === 'dark'? '#333': '#FFF', height: '100vh', display:"flex", alignItems: "center", justifyContent:"center"}}>
                  <Routes>
                      <Route path='/' element={<Home/>}/>
                      <Route path='/events' element={<Events/>}/>
                      <Route path='/projects' element={<Projects/>}/>
                      <Route path='/about' element={<About/>}/>
                      <Route path='/contacts' element={<Contacts/>}/>
                  </Routes>
              </main>
          </MantineProvider>
      </ColorSchemeProvider>

  )
}

export default App
