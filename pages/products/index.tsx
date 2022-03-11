import Head from 'next/head';
import Link from 'next/link';
import {Avatar, Box, Grid} from '@mui/material';
import {ProductOptionsProps, productTypeOptions} from '../../constants/enum-label';

export default function ProductsPage() {

  return (
    <div>
      <Head>
        <title>Kalóriaszámláló - Termékek</title>
      </Head>
      <Grid container columnSpacing={{sm: 4, md: 12, lg: 6, xl: 12}} rowSpacing={5}>
        {productTypeOptions.map((productType, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4} className="center">
            <ProductType type={productType}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function ProductType(props: {type: ProductOptionsProps}) {
  const {type} = props;

  return (
    <Link href={'/products/' + type.value} passHref>
      <a>
        <Box sx={{cursor: 'pointer', transition: 'transform 100ms', '&:hover': {transform: 'scale(1.05)'}}} onClick={() => {}}>
          <Avatar src={type.imageSrc} sx={{width: 300, height: 300}}/>
          <Box sx={{
            mt: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'xx-large',
            color: 'white',
            fontFamily: 'cursive',
            borderRadius: 100,
            letterSpacing: 3,
            backgroundImage: type.gradient,
          }}>
            {type.label}
          </Box>
        </Box>
      </a>
    </Link>
  );
}
