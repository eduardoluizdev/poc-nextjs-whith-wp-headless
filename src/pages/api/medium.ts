/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseString } from 'xml2js';

const POSTS_URL = `https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`;


export default async (_req: NextApiRequest, res: NextApiResponse) => {

   await axios.get(POSTS_URL).then(response => {
         parseString(response.data, (_err, res2) =>{
            res.end(JSON.stringify(res2.rss.channel[0].item))
         })
      }).catch(response => res.end(response.data));
      
}