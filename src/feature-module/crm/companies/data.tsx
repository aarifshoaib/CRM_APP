
import { version } from "react";
import { project, tagInputValues } from "../../../core/common/selectoption/selectoption"

const options = [
    {
        label: "Darlee Robertson",
        value: "avatar-19.jpg",
        image: "assets/img/profiles/avatar-19.jpg",
    },
    {
        label: "Sharon Roy",
        value: "avatar-20.jpg",
        image: "assets/img/profiles/avatar-20.jpg",
    },
    {
        label: "Vaughan",
        value: "avatar-21.jpg",
        image: "assets/img/profiles/avatar-21.jpg",
    },
    {
        label: "Jessica",
        value: "avatar-23.jpg",
        image: "assets/img/profiles/avatar-23.jpg",
    },
    {
        label: "Carol Thomas",
        value: "avatar-16.jpg",
        image: "assets/img/profiles/avatar-16.jpg",
    },
];

const dealsopen = [
    { value: "choose", label: "Choose" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
    { value: "schumm", label: "Schumm" },
    { value: "wisozk", label: "Wisozk" },
];

const currencies = [{
    value: "choose",
    label: "Choose",
},
{
    value: "usd",
    label: "USD",
},
{
    value: "inr",
    label: "INR",
},
{
    value: "aed",
    label: "AED",
},
{
    value: "eur",
    label: "EUR",
}];
const activities = [
    { value: "choose", label: "Choose" },
    { value: "phoneCalls", label: "Phone Calls" },
    { value: "socialMedia", label: "Social Media" },
    { value: "referralSites", label: "Referral Sites" },
    { value: "webAnalytics", label: "Web Analytics" },
    { value: "previousPurchases", label: "Previous Purchases" },
];
const industries = [
    { value: "choose", label: "Choose" },
    { value: "Retail Industry", label: "Retail Industry" },
    { value: "Banking", label: "Banking" },
    { value: "Hotels", label: "Hotels" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Insurance", label: "Insurance" },
];
const languages = [
    { value: "Choose", label: "Choose" },
    { value: "English", label: "English" },
    { value: "Arabic", label: "Arabic" },
    { value: "Chinese", label: "Chinese" },
    { value: "Hindi", label: "Hindi" },
];
const countries = [
    { value: "Choose", label: "Choose" },
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "France", label: "France" },
    { value: "UAE", label: "UAE" },
];

export const formFields = [
    { type: "textbox", title: "Name", field: "name", isRequired: false, columnSize: 12, isList: true, listType: "text", isPrimary: true, isTitle:true, heading: "Name", link: true, route: "/crm/companyDetails", linkValues: ["id"] },
    { type: "textbox", title: "Email Address", field: "email", isRequired: true, columnSize: 12, inputType: "email", isList: true, isPrimary: true, heading: "Email", listtype: "text" },
    { type: "textbox", title: "Phone 1", field: "phone1", isRequired: true, columnSize: 6, inputType: "tel", isList: true, heading: "Phone", listType: "text", isPrimary: true },
    { type: "textbox", title: "Phone 2", field: "phone2", isRequired: false, columnSize: 6, inputType: "tel" },
    { type: "textbox", title: "Fax", field: "fax", isRequired: true, columnSize: 6, inputType: "tel" },
    { type: "textbox", title: "Website", field: "website", isRequired: true, columnSize: 6, inputType: "url", placeholder: "https://www.example.com" },
    {
        type: "textbox",
        title: "Ratings",
        field: "ratings",
        columnSize: 6,
        inputType: "number",
        min: 1,
        max: 5,
        iconOptions: { icon: "ti ti-star", size: 10, color: "FFF" },
        isList: true,
        heading: "Ratings",
        icon: "fa fa-star filled me-2",
        listType: "text",
        isPrimary: true
        
    },
    {
        type: "select",
        title: "Owner",
        field: "owner",
        isRequired: true,
        columnSize: 6,
        isSearchable: true,
        data: options,
        isList: true,
        heading: "Owner",
        listType: "text",
        isPrimary: true,
        isSubTitle: true

    },
    {
        type: "textbox",
        title: "Tags",
        field: "tags",
        columnSize: 6,
        inputType: "text",
        className: "input-tags form-control",
        "data-role": "tagsinput",
        defaultValue: "Collab",
        isList: true,
        heading: "Tagged",
        listType: 'tags',
        isRequired: true
    },
    {
        type: "select",
        title: "Deals",
        field: "deals",
        isRequired: true,
        columnSize: 6,
        isSearchable: true,
        data: dealsopen,
        isList: true,
        isPrimary: true,
    },
    {
        type: "select",
        title: "Source",
        field: "source",
        isRequired: true,
        columnSize: 6,
        isSearchable: false,
        data: activities,
        isList: true,

    },
    {
        type: "select",
        title: "Industry",
        field: "industry",
        isRequired: true,
        columnSize: 6,
        isSearchable: false,
        data: industries
    },
    {
        type: "select",
        title: "Contacts",
        field: "contacts",
        isRequired: true,
        columnSize: 12,
        isSearchable: true,
        isMulti: true,
        data: project,
        defaultValue: tagInputValues
    },
    {
        type: "select",
        title: "Currency",
        field: "currency",
        isRequired: true,
        columnSize: 6,
        isSearchable: false,
        data: currencies,
        isList: true,
    },
    {
        type: "select",
        title: "Language",
        field: "language",
        isRequired: true,
        columnSize: 6,
        isSearchable: false,
        data: languages
    },
    {
        type: "textbox",
        title: "Description",
        field: "description",
        isRequired: true,
        columnSize: 12,
        multiline: true,
        rows: 5
    },
    {
        isList: true,
        heading: "Status",
        field: "status",
        isformField: false

    }
];

export const address = [
    { type: "textbox", title: "Address", field: "address", isRequired: true, columnSize: 12 },
    { type: "textbox", title: "City", field: "city", isRequired: false, columnSize: 6 },
    { type: "textbox", title: "State", field: "state", isRequired: false, columnSize: 6 },
    {
        type: "select",
        title: "Country",
        field: "country",
        isRequired: false,
        columnSize: 6,
        placeholder: "Choose",
        isSearchable: false,
        data: countries,
        isList: true,
        heading: 'Location'
    },
    { type: "textbox", title: "Zip Code", field: "zip", isRequired: false, columnSize: 6 },

];

export const social = [
    { type: "textbox", title: "Facebook Link", field: "facebook", isRequired: false, columnSize: 6, inputType: "url" },
    { type: "textbox", title: "Twitter ID", field: "twitter", isRequired: false, columnSize: 6, inputType: "url" },
    { type: "textbox", title: "Linkedin", field: "linkedin", isRequired: false, columnSize: 6, inputType: "url" },
    { type: "textbox", title: "Skype", field: "skype", isRequired: false, columnSize: 6, inputType: "url" },
    { type: "textbox", title: "WhatsApp", field: "whatsapp", isRequired: false, columnSize: 6, inputType: "url" },
    { type: "textbox", title: "Instagram", field: "instagram", isRequired: false, columnSize: 6, inputType: "url", isList: false, heading: "false" },
];

export const CompaniesData = {
    name: "Companies",
    version: 1.0,
    listRoute: '/crm/companies',
    gridRoute: '/crm/companies',
    formRoute: '/crm/company',
    addButtonName: 'Add Company',
    sections: [
        {
            title: "Company Information",
            id: "companyInfo",
            icon: "ti ti-user",
            type: "accordion",
            fields: [ ...formFields ]
        },
        {
            title: "Address",
            id: "address",
            icon: "ti ti-map",
            type: "accordion",
            fields: [ ...address ]
        },
        {
            title: "Social",
            id: "social",
            icon: "ti ti-share",
            type: "accordion",
            fields: [ ...social ]
        }
    ]
}
