CREATE TABLE [dbo].[Client] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [Name]        VARCHAR (100)    NOT NULL UNIQUE,
    [PhoneNumber] VARCHAR (10)     NULL,
    [Email]       VARCHAR (100)     NULL,
    PRIMARY KEY (Id)
);



