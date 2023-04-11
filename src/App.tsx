import { useEffect, useState } from "react"
import { Box, Center, ChakraProvider,  Container,Heading,Stack,Text, theme,useColorModeValue, SimpleGrid,  StackProps, Image } from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { AiFillStar ,AiOutlineStar } from 'react-icons/ai'
import { getUserData } from './mockServer'

type PropsData ={
  title?: string,
  country?:number,
  days?:number,
  emissions?:string,
  stars:number,
  background?:string
}

export const App = () => {
  
const [data, setData]= useState<PropsData[]>([])

  const getData =  async () =>{
    const dataFromServer = await getUserData()
    setData(dataFromServer.elements)
  }

  useEffect(()=>{
    getData()
   
  },[])

  return(
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher justifySelf="flex-end" />
    <Layout>
      {data && data.map((item, i)=>(
        <Card 
          key={i} 
          title={item.title}
          country={item.country}
          days={item.days}
          emissions={item.emissions}
          stars={item.stars}
          background={item.background}
        />
      ))}
    </Layout>
  </ChakraProvider>
)}


 



const Card  : React.FC<PropsData> = (props:PropsData) => {
  const {title, country, days, emissions, stars,background} = props
  const color =useColorModeValue('white', 'gray.800')
console.log('background:',background);

  return(
    <Center
      rounded='xl'
      p={3}
      boxShadow='md'
      overflow={'hidden'}
    >
      <Stack
        px={{base:5,md:10}}
        align={'center'}
        rounded='xl'
        w='100%'
        height={'260px'}
        justifyContent='flex-end'

        backgroundImage={background}
        backgroundRepeat='no-repeat'
        backgroundSize='cover'
        backgroundPosition='center'
        color={color}
      >
        <Heading 
          as='h2' 
          fontSize='xl' 
          textTransform='capitalize' 
          textAlign='center'
          noOfLines={1}
        > 
          {title} 
        </Heading>
        <Text fontSize='lg'>
          {country} country, {days} days
        </Text>

        <TextWrapper emissions={emissions}  bg={useColorModeValue('gray.800','white')}   borderRadius={'lg'} />
        <TextWrapper  stars={stars} bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.800','white')}  borderTopRadius={'lg'} />

      </Stack>
    </Center>
  )
}


const Layout= ({ children }: { children: React.ReactNode }) => (
  <Container  maxW='container.xl'>
    <SimpleGrid columns={{base:1,md:2,lg:3}} spacing={5}>
      {children}
    </SimpleGrid>
  </Container>
)


type TextWrapperProps={
  stars?: number
  emissions?: string
}&StackProps

const TextWrapper : React.FC<TextWrapperProps> = (props:TextWrapperProps) => {
  const {stars,emissions} = props
  
  return(
    <Stack 
      direction={'row'}  
      p={5} 
      w='100%'
      justifyContent='space-between'
      {...props}  
    >
      {emissions!==undefined ? <Text fontWeight='bold'> Emissions offset: </Text> : null}
      {stars!==undefined ? <Text fontWeight='bold'> Trip rating </Text> : null}

      {emissions!==undefined ? <Text>{emissions} CO<sub>2</sub></Text>: null}
      {stars!==undefined?  <StarRating star={stars}/> :null}
    </Stack>
  )
}


const StarRating = ({ star }: { star: number }) => {
  const totalStars = 5
  const activeStars: number = star

  return(
    <Box
      display= "inline-flex"
      position= "relative"
      textAlign= "left"
      alignItems='center'
    >
      {[...new Array(totalStars)].map((arr, index) => {
        return (
          <Box position="relative" key={index}>
            <Box
              width= {index <= activeStars ? "100%" : "0%"}
              overflow= "hidden"
              position= "absolute"
            >
              <AiFillStar/> 
            </Box>
            <Box>
              <AiOutlineStar/>
            </Box>
          </Box>
        )
      })}
      <Text fontWeight='bold'>{star}</Text>
    </Box> 
  )
}



