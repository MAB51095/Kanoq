CREATE TABLE [dbo].[Client] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [Name]        VARCHAR (100)    NOT NULL UNIQUE,
    [PhoneNumber] VARCHAR (10)     NULL,
    [Email]       VARCHAR (100)     NULL,
    [IsDeleted] BIT NOT NULL Default(0),
    PRIMARY KEY (Id),
    UNIQUE(Name)
);



