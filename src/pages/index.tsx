/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import withApollo from 'shared/libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

const GET_GENERAL_SITE_OPTIONS = gql`
  query SiteGeneralOptions {
    myOptionsPage {
      siteGeneralOptions {
        logo {
          altText
          sourceUrl
        }
        socialLinks {
          socialLink {
            target
            title
            url
          }
        }
      }
    }
  }
`

// type SocialLinksDataProps = {
//   socialLink: {
//     title: string
//     url: string
//     target: string
//   }
// }

// // type SocialLinksProps = {
// //   title: string
// //   url: string
// //   target: string
// // }

// // type LogoProps = {
// //   altText: string
// //   sourceUrl: string
// // }

// // type GeneralSiteOptionsProps  = {
// //   logo: LogoProps
// //   socialLinks: SocialLinksProps[] 
// // }

// // type DataProps = {
// //   data: GeneralSiteOptionsProps
// // }

  const pageContent = (data: any) => {   
    if (!data) return 

    return {
      logo: {
        altText: data.myOptionsPage.siteGeneralOptions.logo.altText,
        sourceUrl: data.myOptionsPage.siteGeneralOptions.logo.sourceUrl,
      },
      socialLinks : data.myOptionsPage.siteGeneralOptions.socialLinks.map((socialLink: any) => {
        return {
          title: socialLink.socialLink.title,
          url: socialLink.socialLink.url,
          target: socialLink.socialLink.target,
        }
      })
    } 
  }


const Home = () => {
  const { data, loading } = useQuery(GET_GENERAL_SITE_OPTIONS);
  const content = pageContent(data)
  


  if (!data && loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Poc NextJS with Headless WP</h1>

      <img src={content?.logo.sourceUrl} alt={content?.logo.altText} />

      <ul>
        {content?.socialLinks.map((socialLink:any, index: any) => (
          <li key={index}>
            <a href={socialLink.url} target={socialLink.target}>{socialLink.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// export const getServerSideProps:GetServerSideProps = async () => {
//   const { data } = await client.query({
//     query: GET_GENERAL_SITE_OPTIONS,
//   });

//   const pageContent:GeneralSiteOptionsProps = {
//     logo: {
//       altText: data.myOptionsPage.siteGeneralOptions.logo.altText,
//       sourceUrl: data.myOptionsPage.siteGeneralOptions.logo.sourceUrl,
//     },
//     socialLinks : data.myOptionsPage.siteGeneralOptions.socialLinks.map((socialLink: SocialLinksDataProps) => {
//       return {
//         title: socialLink.socialLink.title,
//         url: socialLink.socialLink.url,
//         target: socialLink.socialLink.target,
//       }
//     }),
//   }

//   return {
//     props: {
//       data: pageContent
//     }
//  };
// }

export default withApollo(Home, { getDataFromTree })

