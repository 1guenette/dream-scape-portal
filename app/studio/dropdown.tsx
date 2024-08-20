'use client'
import Image from "next/image";
import "./dropdown.css";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";




export default function Dropdown() {
    return (
        <div>
            <ul className="multilevel-accordion-menu vertical menu" data-accordion-menu>
                <li>
                    <a href="/">Item 1</a>
                    <ul className="menu vertical sublevel-1">
                        <li>
                            <a href="/">Sub-item 1</a>
                            <ul className="menu vertical sublevel-2">
                                <li><a className="subitem" href="/">Thing 1</a></li>
                                <li><a className="subitem" href="/">Thing 2</a></li>
                                <li><a className="subitem" href="/">Thing 3</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/">Sub-item 2</a>
                            <ul className="menu vertical sublevel-2">
                                <li>
                                    <a href="/">Super-sub-item 1</a>
                                    <ul className="menu vertical sublevel-3">
                                        <li><a className="subitem" href="/">Thing 1</a></li>
                                        <li><a className="subitem" href="/">Thing 2</a></li>
                                    </ul>
                                </li>
                                <li><a className="subitem" href="/">Thing 2</a></li>
                            </ul>
                        </li>
                        <li><a className="subitem" href="/">Thing 1</a></li>
                        <li><a className="subitem" href="/">Thing 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/">Item 2</a>
                    <ul className="menu vertical sublevel-1">
                        <li><a className="subitem" href="/">Thing 1</a></li>
                        <li><a className="subitem" href="/">Thing 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/">Item 3</a>
                    <ul className="menu vertical sublevel-1">
                        <li><a className="subitem" href="/">Thing 1</a></li>
                        <li><a className="subitem" href="/">Thing 2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/">Item 4</a>
                    <ul className="menu vertical sublevel-1">
                        <li>
                            <a href="/">Sub-item 3</a>
                            <ul className="menu vertical sublevel-2">
                                <li><a className="subitem" href="/">Thing 1</a></li>
                                <li><a className="subitem" href="/">Thing 2</a></li>
                            </ul>
                        </li>
                        <li><a className="subitem" href="/">Thing 1</a></li>
                        <li><a className="subitem" href="/">Thing 2</a></li>
                    </ul>
                </li>
            </ul>


        </div>
    );
}
