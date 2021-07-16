import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import Head from 'next/head'
import Header from '../../../components/header/header'


export default function allJobs(info) {
    
   // console.log(info.query)

    const [unfilledJobs,setUnfilledJobs] =useState([]);

    const [filledJobs,setFilledJobs] =useState([]);

    useEffect(()=>{

        if(info.query.dest==="unfilled"){

            setFilledJobs([])

            Axios.post('https://blooming-crag-03737.herokuapp.com/getUnFillededJob',{

                company_id:info.query.company_id,

            }).then(resutlt=>{

                if(!resutlt.data.err){

                    setUnfilledJobs(resutlt.data)

                }else {

                    setAlert("Identifiants et / ou  mot de passe incorrects")

                }
            });


        }else{

            setUnfilledJobs([])

            Axios.post('https://blooming-crag-03737.herokuapp.com/getFillededJob',{

                company_id:info.query.company_id,

            }).then(resutlt=>{

                if(!resutlt.data.err){  

                    setFilledJobs(resutlt.data)

                }else {

                    setAlert("Identifiants et / ou  mot de passe incorrects")
                }
            }); 
        }

    },[]);

    return (
        <div>
             <Head>
                <title>A recruit | Recruteur</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*---------------*/}
            <Header/>
            <main>

                <div className="titre2XL">Toutes les offres</div>

                {unfilledJobs.length!==0 ? 

                    unfilledJobs.map((job,index)=>{

                        return (
                            <div className="demande" key={index}>
                                <label>{job.job_title}</label>
                                <div><label>Crée le :</label> {job.created_at}</div>
                                <div><label>Retenue  : </label>{" "+ job.job_hire}</div>
                            </div>
                        )
                    })
                
                : filledJobs.length!==0 ? 

                    filledJobs.map((job,index)=>{

                        return (
                            <div className="demande" key={index}>
                                <label>{job.job_title}</label>
                                <div><label>Crée le :</label> {job.created_at}</div>
                                <div><label>Retenue  : </label>{" "+ job.job_hire}</div>
                            </div>
                        )
                    })
                
                :<div>Aucune donnée à afficher</div>}
            </main>

            
        </div>
    )
}

export const getServerSideProps = async ({query}) => {
   
    return {
       props: { 
            query,
        }
    }
}
