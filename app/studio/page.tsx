'use client'
import { Row} from "@nextui-org/react";
import Dropdown from "./dropdown";
import { Tree, AnimatedTree } from 'react-tree-graph';
import StoryForm from './StudioForm/StoryForm'
import Tree2 from "./StudioForm/Tree2";
// import "./graph.css";
// import "../globals.css";
// import "bootstrap/dist/css/bootstrap.min.css"





export default function Studio() {

  const data = {
    name: 'Parent',
    children: [
      {
        name: 'Child One',
        children: [
          {
            name: 'Child One'
          },
          {
            name: 'Child Two'
          }
        ]
      },
      {
        name: 'Child Two',
        children: [
          {
            name: 'Child One',
            children: [
              {
                name: 'Child One'
              },
              {
                name: 'Child Two'
              }
            ]
          },
          {
            name: 'Child Two',
            children: [
              {
                name: 'Child One',
                children: [
                  {
                    name: 'Child One'
                  },
                  {
                    name: 'Child Two',
                    children: [
                      {
                        name: 'Child One'
                      },
                      {
                        name: 'Child Two',
                        children: [
                          {
                            name: 'Child One'
                          },
                          {
                            name: 'Child Two',
                            children: [
                              {
                                name: 'Child One'
                              },
                              {
                                name: 'Child Two',
                                children: [
                                  {
                                    name: 'Child One'
                                  },
                                  {
                                    name: 'Child Two',
                                    children: [
                                      {
                                        name: 'Child One',
                                        children: [
                                          {
                                            name: 'Child One'
                                          },
                                          {
                                            name: 'Child Two',
                                            children: [
                                              {
                                                name: 'Child One'
                                              },
                                              {
                                                name: 'Child Two',
                                                children: [
                                                  {
                                                    name: 'Child One'
                                                  },
                                                  {
                                                    name: 'Child Two'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        name: 'Child Two',
                                        children: [
                                          {
                                            name: 'Child One'
                                          },
                                          {
                                            name: 'Child Two',
                                            children: [
                                              {
                                                name: 'Child One'
                                              },
                                              {
                                                name: 'Child Two'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'Child Two'
              }
            ]
          }
        ]
      }
    ]

  }


  return (

    <main className="dark text-foreground bg-background">
      <div style={{overflowX: "scroll"}}>
        <AnimatedTree
          data={data}
          height={400}
          width={1600}
          svgProps={{
            className: 'custom'
          }}
          gProps={{
            onClick: (e, node) => { console.log(node) },
            onContextMenu: (e) => { console.log(e) }
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <StoryForm data={data} />
      </div>
    </main>
  )
}