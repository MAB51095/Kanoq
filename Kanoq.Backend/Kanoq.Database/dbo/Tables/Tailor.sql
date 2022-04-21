CREATE TABLE [dbo].[Tailor] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [Name]        VARCHAR (100)    NOT NULL,
    [PhoneNumber] VARCHAR (10)     NULL,
    [Email]       VARCHAR (100)    NULL,
    PRIMARY KEY (Id)
);

