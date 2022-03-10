import Head from 'next/head';
import Link from 'next/link';
import {Avatar, Box, Grid} from '@mui/material';
import {EnumLabel, productTypeOptions} from '../../constants/enum-label';

export default function ProductsPage() {

  return (
    <div>
      <Head>
        <title>Kalória Számláló - Termékek</title>
      </Head>
      <Grid container columnSpacing={{sm: 4, md: 12, lg: 6, xl: 12}} rowSpacing={4}>
        {productTypeOptions.map((productType, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4} className="center">
            <ProductType type={productType}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function ProductType(props: {type: EnumLabel & {imageSrc: string}}) {
  const {type} = props;

  return (
    <Link href={'/products/' + type.value} passHref>
      <a>
        <Box sx={{cursor: 'pointer'}} onClick={() => {}}>
          <Avatar src={type.imageSrc} sx={{width: 250, height: 250}}/>
          <Box sx={{textAlign: 'center', fontWeight: 'bold', fontSize: 'xx-large'}}>{type.label}</Box>
        </Box>
      </a>
    </Link>
  );
}
